const articleCollection = require('../schemas/articles');

class NewsEditor {
    async getArticles(thema) {
        try {
            const articles = await articleCollection.find({ thema });
            console.log(articles);
            return articles;
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = NewsEditor;
