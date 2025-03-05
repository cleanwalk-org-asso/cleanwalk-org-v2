export interface Article {
    id?: number
    title: string
    content: string
    author: string
    tags: string[]
    frontImageUrl: string
    createdAt: string
    updatedAt: string
    isDraft: boolean
    isPublished: boolean
}

export interface ArticleCreation {
    title: string
    content: string
    author: string
    tags: string[]
    frontImageUrl: string
    createdAt: string
    isDraft: boolean
}

export interface ArticleUpdate {
    title: string
    content: string
    tags: string[]
    frontImageUrl: string
    updatedAt: string
    isPublished: boolean
}
