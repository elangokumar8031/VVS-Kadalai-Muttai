import re

input_file = r'c:\Users\ELANGO\Peanet_candy_shop\client\src\assets\franchiseloc.svg'

with open(input_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Find all paths
paths = re.findall(r'<path[^>]+>', content)

# Sort paths by length of the 'd' attribute or the path itself
paths.sort(key=len, reverse=True)

print("Top 5 longest paths:")
for i in range(min(5, len(paths))):
    print(f"Path {i}: {paths[i][:200]}...")
