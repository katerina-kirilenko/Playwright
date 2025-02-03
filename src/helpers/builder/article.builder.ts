import {faker} from '@faker-js/faker';

export interface IArticle {
    title: string;
    description: string;
    text: string;
    tags: string;
}

export class ArticleBuilder {
    private readonly article: IArticle;

    constructor() {
        this.article = {
            title: faker.lorem.sentence(),
            description: faker.lorem.sentence(),
            text: faker.lorem.paragraphs(3),
            tags: faker.lorem.words(),
        };
    }

    setTitle(title: string): this {
        this.article.title = title;
        return this;
    }

    setDescription(description: string): this {
        this.article.description = description;
        return this;
    }

    setText(text: string): this {
        this.article.text = text;
        return this;
    }

    setTags(tags: string): this {
        this.article.tags = tags;
        return this;
    }

    build(): IArticle {
        return this.article;
    }
}