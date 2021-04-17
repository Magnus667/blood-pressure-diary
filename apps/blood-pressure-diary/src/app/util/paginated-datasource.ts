import { DataSource } from "@angular/cdk/table";
import { BehaviorSubject, combineLatest, Observable, Subject } from "rxjs";
import { map, shareReplay, startWith, switchMap } from "rxjs/operators";

export interface Sort<T> {
    property: keyof T;
    order: 'ASC' | 'DESC';
}

export interface PageRequest<T> {
    page: number;
    size: number;
    sort?: Sort<T>;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    size: number;
    number: number;
}

export type PaginatedEndpoint<T, Q> = (pageable: PageRequest<T>, query: Q) => Observable<Page<T>>;

export class PaginatedDatasource<T, Q> implements DataSource<T> {
    private pageNumber = new Subject<number>();
    private sort: BehaviorSubject<Sort<T>>;
    private query: BehaviorSubject<Q>;
    
    page$: Observable<Page<T>>;

    constructor(
        private endpoint: PaginatedEndpoint<T, Q>,
        initialSort: Sort<T>,
        initialQuery: Q,
        public pageSize = 10
    ){
        this.sort = new BehaviorSubject<Sort<T>>(initialSort);
        this.query = new BehaviorSubject<Q>(initialQuery);
        const param$ = combineLatest([this.query, this.sort]);
        this.page$ = param$.pipe(
            switchMap(([query, sort]) => this.pageNumber.pipe(
                startWith(0),
                switchMap(page => this.endpoint({page, sort, size: this.pageSize}, query))
            )),
            shareReplay(1)
        )
    }

    sortBy(sort: Partial<Sort<T>>): void {
        const lastSort = this.sort.getValue();
        const nextSort = { ...lastSort, ...sort };
        this.sort.next(nextSort);
    }

    queryBy(query: Partial<Q>): void {
        const lastQuery = this.query.getValue();
        const nextQuery = { ...lastQuery, ...query };
        this.query.next(nextQuery);
    }

    fetch(page: number): void {
        this.pageNumber.next(page);
    }

    connect(): Observable<T[]> {
        return this.page$.pipe(map(page => page.content));
    }

    disconnect(): void {
        
    }
}