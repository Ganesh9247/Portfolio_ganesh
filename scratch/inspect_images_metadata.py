import fitz
import os

def main():
    pdf_path = r"D:\portfolio\certificates\internship-certificates.pdf"
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        return
        
    doc = fitz.open(pdf_path)
    for i, page in enumerate(doc):
        images = page.get_images(full=True)
        print(f"--- PAGE {i + 1} ({len(images)} images) ---")
        for img_info in images:
            xref = img_info[0]
            base_image = doc.extract_image(xref)
            image_ext = base_image["ext"]
            image_size = len(base_image["image"])
            print(f"  XREF: {xref}, Format: {image_ext}, Size: {image_size} bytes")

if __name__ == "__main__":
    main()
