import os
import sys

def check_and_install_pypdf():
    try:
        import pypdf
    except ImportError:
        print("pypdf not found. Installing pypdf...")
        os.system("pip install pypdf")
        import pypdf
    return pypdf

def main():
    pdf_path = r"D:\portfolio\certificates\internship-certificates.pdf"
    if not os.path.exists(pdf_path):
        print(f"Error: PDF file not found at {pdf_path}")
        return

    pypdf = check_and_install_pypdf()
    
    print(f"Opening {pdf_path}...")
    reader = pypdf.PdfReader(pdf_path)
    total_pages = len(reader.pages)
    print(f"Total pages: {total_pages}\n")

    for i in range(total_pages):
        page = reader.pages[i]
        text = page.extract_text()
        first_lines = [line.strip() for line in text.split('\n') if line.strip()][:8]
        print(f"--- PAGE {i + 1} ---")
        for line in first_lines:
            print(f"  {line}")
        print()

if __name__ == "__main__":
    main()
