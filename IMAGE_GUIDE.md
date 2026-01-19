# 📸 How to Add Real Images to Your Birthday Website

## 🗂️ **Folder Structure**
```
your-project/
├── index.html
├── style.css
├── script.js
├── images/          ← Create this folder
│   ├── photo1.jpg   ← Add your photos here
│   ├── photo2.jpg
│   ├── photo3.jpg
│   └── photo4.jpg
└── IMAGE_GUIDE.md
```

## 📋 **Step-by-Step Instructions**

### **Method 1: Local Images (Best for Personal Use)**

1. **Create Images Folder:**
   - Create a new folder called `images` in your project directory
   - Add your photos to this folder

2. **Rename Your Photos:**
   - `photo1.jpg` - First photo (Best friends forever)
   - `photo2.jpg` - Second photo (Spring adventures)  
   - `photo3.jpg` - Third photo (Coffee dates)
   - `photo4.jpg` - Fourth photo (Fun times)

3. **Supported Formats:**
   - `.jpg` or `.jpeg`
   - `.png`
   - `.webp`
   - `.gif`

### **Method 2: Online Images (Using URLs)**

Replace the `src` attributes with direct image URLs:

```html
<img src="https://example.com/your-image.jpg" alt="Description" class="actual-photo">
```

### **Method 3: Base64 Encoded Images**

For small images, you can embed them directly:

```html
<img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..." alt="Description" class="actual-photo">
```

## 🎨 **Customization Options**

### **Change Photo Captions:**
Edit the text in `photo-caption` divs:
```html
<div class="photo-caption">Your Custom Caption Here!</div>
```

### **Change Hidden Messages:**
Edit the text in `hidden-message` divs:
```html
<div class="hidden-message">Your custom message when photo is clicked! 💕</div>
```

### **Add More Photos:**
Copy this template and add it to the photo-grid:
```html
<div class="polaroid" onclick="revealMessage(this)">
    <div class="photo-placeholder" style="position: relative;">
        <img src="images/photo5.jpg" alt="New memory" class="actual-photo">
        <div class="photo-frame"></div>
    </div>
    <div class="photo-caption">New Memory!</div>
    <div class="hidden-message">Another amazing moment! ✨</div>
</div>
```

## 🔧 **Troubleshooting**

### **Image Not Showing?**
1. Check file path is correct
2. Ensure image file exists in the `images` folder
3. Check file extension matches (jpg, png, etc.)
4. Make sure image file isn't corrupted

### **Image Too Large/Small?**
The CSS automatically resizes images to fit the polaroid frame using `object-fit: cover`.

### **Want Different Aspect Ratio?**
Change the height in CSS:
```css
.photo-placeholder {
    height: 200px; /* Change from 150px to desired height */
}
```

## 🎉 **Quick Test**
1. Add any image to the `images` folder
2. Rename it to `photo1.jpg`
3. Refresh your website
4. The first polaroid should now show your image!

## 💡 **Pro Tips**
- Use square or portrait images for best results
- Keep image file sizes under 2MB for faster loading
- Use descriptive alt text for accessibility
- Consider using optimized web formats like WebP for better performance