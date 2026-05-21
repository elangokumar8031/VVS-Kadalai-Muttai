import re

input_file = r'c:\Users\ELANGO\Peanet_candy_shop\client\src\assets\franchiseloc.svg'
output_file = r'c:\Users\ELANGO\Peanet_candy_shop\client\src\assets\franchiseloc.svg'

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove background path (usually the first large path with a dark fill)
# Searching for the first path with fill="#0B0B0B" or similar dark colors and large dimensions
# Based on previous view_file, it's at line 3.
content = re.sub(r'<path d="M0 0 C850.74 0 1701.48 0 2578 0 C2578 549.12 2578 1098.24 2578 1664 C1727.26 1664 876.52 1664 0 1664 C0 1114.88 0 565.76 0 0 Z " fill="#0B0B0B" transform="translate\(0,0\)"/>', '', content)

# 2. Change all fills to white (for dots)
# We match fill="#XXXXXX" and replace with fill="#FFFFFF"
content = re.sub(r'fill="#[A-Fa-f0-9]{6}"', 'fill="#FFFFFF"', content)

# 3. Optional: Search and remove common watermark patterns if they exist (though not found in grep)
# Sometimes watermarks are at the bottom.

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("SVG processed successfully.")
