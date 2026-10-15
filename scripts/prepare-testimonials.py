"""Create real client posters and permanently branded testimonial copies.

Run with the bundled Python runtime; FFmpeg comes from .tools/video-runtime.
Original MP4 files are preserved. Use --preview to inspect the selected frames.
"""
from pathlib import Path
import re
import subprocess
import sys
import shutil

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools/video-runtime'))
import imageio_ffmpeg
from PIL import Image, ImageDraw

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FILES = [
    'BrainBoys-Testimonial-1.mp4', 'BrainBoys-Testimonial-2.mp4',
    'BrainBoys-Testimonial-2-37-04-AM.mp4', 'BrainBoys-Testimonial-2-37-31-AM.mp4',
    'BrainBoys-Testimonial-2-39-02-AM.mp4', 'BrainBoys-Testimonial-3.mp4',
    'BrainBoys-Testimonial-4.mp4', 'BrainBoys-Testimonial-5-01-20-PM.mp4',
]


def run(args):
    result = subprocess.run([FFMPEG, '-hide_banner', '-loglevel', 'error', '-nostdin', *args], capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr)


def metadata(path):
    info = subprocess.run([FFMPEG, '-hide_banner', '-i', str(path)], capture_output=True, text=True).stderr
    duration = re.search(r'Duration: (\d+):(\d+):([\d.]+)', info)
    size = re.search(r'Video:.*? (\d{2,5})x(\d{2,5})', info)
    if not duration or not size:
        raise RuntimeError(f'Cannot read video metadata: {path}')
    hours, minutes, seconds = map(float, duration.groups())
    return hours * 3600 + minutes * 60 + seconds, tuple(map(int, size.groups()))


def main():
    previews = ROOT / '.tools/testimonial-previews'
    previews.mkdir(parents=True, exist_ok=True)
    branded = ROOT / 'public/testimonials/branded'
    posters = ROOT / 'public/testimonials/posters'
    branded.mkdir(parents=True, exist_ok=True)
    posters.mkdir(parents=True, exist_ok=True)
    if '--verify' in sys.argv:
        sheet = Image.new('RGB', (4 * 240, 2 * 450), '#eee5fb')
        for index, name in enumerate(FILES):
            source = ROOT / 'public/testimonials' / name
            output = branded / name
            source_duration, source_size = metadata(source)
            output_duration, output_size = metadata(output)
            assert abs(source_duration - output_duration) < .1, f'Duration mismatch: {name}'
            assert source_size == output_size, f'Resolution mismatch: {name}'
            info = subprocess.run([FFMPEG, '-hide_banner', '-i', str(output)], capture_output=True, text=True).stderr
            assert 'Audio: aac' in info and 'Video: h264' in info, f'Missing audio/video stream: {name}'
            poster = posters / (source.stem + '.jpg')
            with Image.open(poster) as frame:
                frame.load()
                frame.thumbnail((234, 416))
                x, y = (index % 4) * 240, (index // 4) * 450
                sheet.paste(frame, (x + (240 - frame.width) // 2, y + 25))
                ImageDraw.Draw(sheet).text((x + 8, y + 8), f'Client {index + 1}', fill='#462076')
            print(f'PASS {index + 1}/8: H.264 + AAC, {output_duration:.2f}s, {output_size}, poster verified', flush=True)
        sheet.save(previews / 'branded-contact-sheet.jpg', quality=88)
        return
    font = ROOT / '.tools/fonts/brand-bold.ttf'
    font.parent.mkdir(parents=True, exist_ok=True)
    if not font.exists():
        shutil.copyfile('C:/Windows/Fonts/arialbd.ttf', font)
    sheet = Image.new('RGB', (360 * 4, 690 * 2), '#f1e9fc')
    draw = ImageDraw.Draw(sheet)
    for index, name in enumerate(FILES):
        source = ROOT / 'public/testimonials' / name
        duration, (width, height) = metadata(source)
        timestamp = min(12, duration * .4)
        preview = previews / f'{index + 1}.png'
        run(['-ss', str(timestamp), '-i', str(source), '-frames:v', '1', '-vf', 'scale=360:-2', '-update', '1', '-y', str(preview)])
        with Image.open(preview) as image:
            image.thumbnail((354, 650))
            x, y = (index % 4) * 360, (index // 4) * 690
            sheet.paste(image, (x + (360 - image.width) // 2, y + 24))
            draw.text((x + 8, y + 8), f'{index + 1}: {timestamp:.1f}s', fill='#462076')
        if '--preview' in sys.argv:
            print(f'{index + 1}: {name}; duration={duration:.2f}; frame={timestamp:.1f}s', flush=True)
            continue
        output = branded / name
        logo_width = max(64, round(width * .22 / 2) * 2)
        bottom = max(65, round(height * .055))
        font_size = max(18, round(width * .026))
        filters = (
            f'[1:v]scale={logo_width}:-1,format=rgba,colorchannelmixer=aa=.05[logo];'
            f'[0:v][logo]overlay=x=(W-w)/2:y=H-h-{bottom}:format=auto,'
            f'drawtext=fontfile=.tools/fonts/brand-bold.ttf:text=BRAINBOYS.AI:'
            f'fontsize={font_size}:fontcolor=white@0.05:'
            f'x=(w-tw)/2:y=h-{bottom}+12,format=yuv420p[out]'
        )
        if not output.exists() or '--force' in sys.argv:
            print(f'Branding {index + 1}/{len(FILES)}: {name}', flush=True)
            temporary = output.with_suffix('.partial.mp4')
            run(['-y', '-i', str(source), '-i', str(ROOT / 'public/brainboys-mark.png'), '-filter_complex', filters,
                 '-map', '[out]', '-map', '0:a?', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
                 '-threads', '2', '-filter_complex_threads', '1', '-c:a', 'copy', '-movflags', '+faststart', str(temporary)])
            temporary.replace(output)
        run(['-ss', str(timestamp), '-i', str(output), '-frames:v', '1', '-vf', 'scale=640:-2', '-q:v', '3', '-update', '1', '-y', str(posters / (source.stem + '.jpg'))])
        print(f'Ready {index + 1}/{len(FILES)}: {name}', flush=True)
    sheet.save(previews / 'contact-sheet.jpg', quality=85)


if __name__ == '__main__':
    main()
