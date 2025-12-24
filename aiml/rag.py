import os
import json
import faiss
from typing import List, Dict
from embedder import Embedder


class Retriever:
    def __init__(self, embedder: Embedder, index_path: str = "index/faiss.index", chunks_path: str = "data/chunks.json"):
        self.embedder = embedder
        self.index_path = index_path
        self.chunks_path = chunks_path
        self.index = None
        self.chunks: List[Dict] = []

        # Try to load FAISS index
        try:
            if not os.path.exists(self.index_path):
                raise FileNotFoundError(self.index_path)
            self.index = faiss.read_index(self.index_path)
        except Exception as e:
            print(f"FAISS index not found at {self.index_path}: {e}")

        # Try to load chunks metadata
        try:
            if not os.path.exists(self.chunks_path):
                raise FileNotFoundError(self.chunks_path)
            with open(self.chunks_path) as f:
                self.chunks = json.load(f)
        except Exception as e:
            print(f"Chunks file not found at {self.chunks_path}: {e}")

    def retrieve(self, query: str, top_k: int = 3) -> List[Dict]:
        # If index or chunks are not available, return empty list and log
        if self.index is None:
            print("Cannot retrieve: FAISS index not loaded.")
            return []
        if not self.chunks:
            print("Cannot retrieve: chunks metadata not loaded.")
            return []

        q_vec = self.embedder.embed_text(query).reshape(1, -1)
        distances, indices = self.index.search(q_vec, top_k)

        results: List[Dict] = []
        for idx in indices[0]:
            if idx == -1:
                continue
            # guard against out-of-range indices
            if idx < 0 or idx >= len(self.chunks):
                continue
            results.append(self.chunks[idx])

        return results
