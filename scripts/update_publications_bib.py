import json
import re
import os

def format_author(author_name):
    parts = author_name.strip().split()
    if len(parts) > 1:
        return f"{parts[-1]}, {' '.join(parts[:-1])}"
    return author_name

def generate_bib_key(authors, year, title):
    first_author_lastname = "author"
    for name in authors:
        parts = name.strip().split()
        if parts:
            first_author_lastname = parts[-1].lower()
            break
    
    # clean first word of title
    title_words = [w for w in re.sub(r'[^a-zA-Z0-9\s]', '', title).split() if w]
    first_title_word = title_words[0].lower() if title_words else "paper"
    
    return f"{first_author_lastname}{year}{first_title_word}"

def main():
    json_path = os.path.join(os.path.dirname(__file__), "..", "data", "publications.json")
    bib_path = os.path.join(os.path.dirname(__file__), "..", "data", "publications.bib")
    
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return
        
    with open(json_path, "r", encoding="utf-8") as f:
        publications = json.load(f)
        
    new_entries = []
    for pub in publications:
        title = pub.get("title", "")
        venue = pub.get("venue", "")
        year = pub.get("year", "")
        doi = pub.get("doi", "")
        url = pub.get("url", "")
        arxiv = pub.get("arxiv", "")
        authors = pub.get("authors", [])
        
        formatted_authors = " and ".join(format_author(a) for a in authors)
        key = generate_bib_key(authors, year, title)
        
        is_preprint = "preprint" in venue.lower() or "arxiv" in venue.lower()
        
        if is_preprint:
            entry = f"""@unpublished{{{key},
  author       = {{{formatted_authors}}},
  title        = {{{title}}},
  note         = {{arXiv:{arxiv}}},
  year         = {{{year}}},
  url          = {{{url}}}
}}"""
        else:
            entry = f"""@article{{{key},
  author       = {{{formatted_authors}}},
  title        = {{{title}}},
  journal      = {{{venue}}},
  year         = {{{year}}},
  doi          = {{{doi}}},
  url          = {{{url}}}
}}"""
        new_entries.append(entry.strip())
        
    all_content = "\n\n".join(new_entries) + "\n"
    
    with open(bib_path, "w", encoding="utf-8") as f:
        f.write(all_content)
        
    print(f"Successfully generated {bib_path} with {len(new_entries)} active papers.")

if __name__ == "__main__":
    main()
