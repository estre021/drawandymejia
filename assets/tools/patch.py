import re
with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

replacement = """<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">
    <title>Dra. Wandy Mejía - Nutrióloga Clínica</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- Overlay para cerrar menú -->
    <div class="overlay" """

text = re.sub(r'<head>\s*<div class="overlay"', replacement, text, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(text)
print("Patch applied")
