import pypdf
import os

def main():
    pdf_path = r"D:\portfolio\certificates\internship-certificates.pdf"
    output_dir = r"D:\portfolio\certificates"
    
    if not os.path.exists(pdf_path):
        print(f"Error: {pdf_path} not found")
        return
        
    print(f"Reading {pdf_path}...")
    reader = pypdf.PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"Total pages: {total_pages}")
    
    for i in range(total_pages):
        writer = pypdf.PdfWriter()
        writer.add_page(reader.pages[i])
        output_name = f"page-{i+1}.pdf"
        output_path = os.path.join(output_dir, output_name)
        with open(output_path, "wb") as f:
            writer.write(f)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    main()
