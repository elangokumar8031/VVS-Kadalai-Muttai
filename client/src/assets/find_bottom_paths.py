import re

input_file = r'c:\Users\ELANGO\Peanet_candy_shop\client\src\assets\franchiseloc.svg'

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all transform="translate(x,y)"
matches = re.findall(r'transform="translate\(([\d\.-]+),([\d\.-]+)\)"', content)

max_y = 0
for x, y in matches:
    max_y = max(max_y, float(y))

print(f"Max Y: {max_y}")

# Find paths with large Y
large_y_paths = re.findall(r'<path[^>]+transform="translate\(([\d\.-]+),([\d\.-]+)\)"[^>]*>', content)
for x, y in large_y_paths:
    if float(y) > 1500:
        print(f"Path at x={x}, y={y}")
