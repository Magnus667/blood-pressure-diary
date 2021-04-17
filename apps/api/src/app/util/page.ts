export interface Page<T> {
    /**
     * The items for this page
     */
    content: T[];

    /**
     * The total number of elements that are avaible on all pages
     */
    totalElements: number;

    /**
     * The number of elements on this page
     * (The last page may contain less items, then the other pages)
     */
    size: number;

    /**
     * The number of the page
     */
    number: number;
}