import { searchService } from '../services/searchService.js';

export class SearchController {
  async searchDocuments(req, res) {
    const { query } = req.body;
    const searchOutput = await searchService.performSemanticSearch(query);
    res.json(searchOutput);
  }
}

export const searchController = new SearchController();
