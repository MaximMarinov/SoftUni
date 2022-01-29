class ArtGallery {
    constructor(creator) {
        this.creator = creator;
        this.possibleArticles = {
            'picture': 200,
            'photo': 50,
            'item': 250 
        };
        this.listOfArticles = [];
        this.guests = [];
    } 

    addArticle( articleModel, articleName, quantity ) {
        quantity = Number(quantity);
        articleModel = articleModel.toLowerCase();

        if (!this.possibleArticles.hasOwnProperty(articleModel)) {
            throw new Error('This article model is not included in this gallery!');
        }
        if (this.listOfArticles.find(a => a.articleName == articleName && a.articleModel == articleModel)) {
            this.listOfArticles.find(a => a.articleName == articleName && a.articleModel == articleModel).quantity += quantity;
        } else {
            const newArticle = {
                articleModel,
                articleName,
                quantity
            };

            this.listOfArticles.push(newArticle);
        }

        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest ( guestName, personality) {
        if (this.guests.find(g => g.guestName == guestName)) {
            throw new Error(`${guestName} has already been invited.`);
        }

        const newGuest =  {
            guestName,
            points: 0,
            purchaseArticle: 0
        };

        switch (personality) {
            case 'Vip':
                newGuest.points = 500;
                break;

            case 'Middle':
                newGuest.points = 250;
                break;

            default:
                newGuest.points = 50;
                break;
        }

        this.guests.push(newGuest);
        return `You have successfully invited ${guestName}!`;
    }

    buyArticle ( articleModel, articleName, guestName) {

        if (!this.listOfArticles.find(a => a.articleName == articleName && a.articleModel == articleModel)) {
            throw new Error('This article is not found.');
        }

        const currentArticle = this.listOfArticles.find(a => a.articleName == articleName && a.articleModel == articleModel);

        if (currentArticle.quantity == 0) {
            return `The ${articleName} is not available.`;
        }

        if (!this.guests.find(g => g.guestName == guestName)) {
            return 'This guest is not invited.';
        }

        const currentGuest = this.guests.find(g => g.guestName == guestName);

        if (currentGuest.points < this.possibleArticles[currentArticle.articleModel]) {
            return 'You need to more points to purchase the article.';

        } else if (currentGuest.points >= this.possibleArticles[currentArticle.articleModel]) {
            currentGuest.points -= this.possibleArticles[currentArticle.articleModel];
            currentArticle.quantity--;
            currentGuest.purchaseArticle++;
        }

        return `${guestName} successfully purchased the article worth ${this.possibleArticles[currentArticle.articleModel]} points.`;
    }

    showGalleryInfo(criteria) {
        let result = [];

        if (criteria == 'article') {
            result.push('Articles information:');
            this.listOfArticles.forEach(a => result.push(`${a.articleModel} - ${a.articleName} - ${a.quantity}`));
            return result.join('\n');
        } else if (criteria == 'guest') {
            result.push('Guests information:');
            this.guests.forEach(g => result.push(`${g.guestName} - ${g.purchaseArticle}`));
            return result.join('\n');
        } 
    }
}


