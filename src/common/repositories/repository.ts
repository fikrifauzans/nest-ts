export class GeneralRepository {

    applySorting(qb: any, sortBy: string = 'id', sortOrder: 'ASC' | 'DESC' = 'ASC') {
        qb.orderBy(`employee.${sortBy}`, sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    async paginateAndSorting(query: any, qb: any): Promise<{ data: any[], pagination: any }> {
        const { page = 1, limit = 10, sortBy = 'id', sortOrder = 'ASC' } = query;

        // Apply sorting
        this.applySorting(qb, sortBy, sortOrder);

        let data: any[];
        let totalCount: number;

        if (!page || !limit || page === 0 || limit === 0) {
            // If page or limit are not provided or are 0/null, return all data
            [data, totalCount] = await qb.getManyAndCount();
        } else {
            // Otherwise, apply pagination
            [data, totalCount] = await qb
                .skip((page - 1) * limit)
                .take(limit)
                .getManyAndCount();
        }

        const totalPages = limit ? Math.ceil(totalCount / limit) : 1;
        const nextPage = page < totalPages ? page + 1 : 0;
        const prevPage = page > 1 ? page - 1 : 0;

        // Calculate the range of data being displayed
        const beginData = limit ? (page - 1) * limit + 1 : 1;
        const endData = limit ? beginData + data.length - 1 : totalCount;

        // Add pagination details to meta
        const pagination = {
            totalCount,
            totalPages,
            currentPage: page,
            nextPage,
            prevPage,
            limit,
            beginData,
            endData
        };

        return { data, pagination };
    }
}
