import fitz # PyMuPDF
import os

def main():
    certificates_dir = r"D:\portfolio\certificates"
    
    # 1. Inspect internship-certificates.pdf
    pdf_path = os.path.join(certificates_dir, "internship-certificates.pdf")
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        return
        
    print(f"Opening {pdf_path}...")
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Total pages: {total_pages}\n")
    
    # Let's inspect and render each page
    for i in range(total_pages):
        page = doc[i]
        
        # Extract text using PyMuPDF (which is much more robust)
        text = page.get_text()
        clean_text = " ".join(text.split())
        
        print(f"--- PAGE {i + 1} TEXT SUMMARY ---")
        if clean_text:
            print(f"  Extracted Text: {clean_text[:300]}...")
        else:
            print("  [No searchable text found on page - scanned/image only]")
            
        # Render page to PNG image (dpi=150 for good quality)
        pix = page.get_pixmap(dpi=150)
        output_img_path = os.path.join(certificates_dir, f"page-{i + 1}.png")
        pix.save(output_img_path)
        print(f"  Saved image: {output_img_path}\n")

    # 2. Render other certificates
    others = ["ACE-Scanner.pdf", "Hackathon_codegnan_Certificate.pdf"]
    for other_pdf in others:
        other_path = os.path.join(certificates_dir, other_pdf)
        if os.path.exists(other_path):
            print(f"Opening {other_pdf}...")
            doc_other = fitz.open(other_path)
            if len(doc_other) > 0:
                page = doc_other[0]
                text = page.get_text()
                clean_text = " ".join(text.split())
                print(f"--- {other_pdf} TEXT SUMMARY ---")
                print(f"  Text: {clean_text[:300]}...")
                pix = page.get_pixmap(dpi=150)
                output_name = other_pdf.replace(".pdf", ".png")
                output_img_path = os.path.join(certificates_dir, output_name)
                pix.save(output_img_path)
                print(f"  Saved image: {output_img_path}\n")

if __name__ == "__main__":
    main()
