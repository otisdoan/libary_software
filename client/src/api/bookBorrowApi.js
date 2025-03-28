import instance from "./axiosClient"

export const bookBorrowApi = {
    requestBorrowBook: async (userId, bookId, returnDays) => {
        const response = await instance.post('/api/borrow-record/borrow-request', {
            userId: userId,
            bookId: bookId,
            returnDays: returnDays
        });
        return response.data;
    },
    getAllBorrowBook: async (page, size, sortField) => {
        const response = await instance.get('/api/borrow-record/',
            {
                params: { page, size, sortField}
            }
        );
        return response.data;
    },
    acceptRequestBorrowBook: async (id, status) => {
        const response = await instance.put(`/api/borrow-record/borrow-request/${id}`, {
            status: status
        });
        return response.data;
    },
    returnBook: async (id) => {
        const response = await instance.put(`/api/borrow-record/return-book/${id}`);
        return response.data;
    },
    getHistoryBorrowBook: async (id, page, size) => {
        const response = await instance.get(`/api/borrow-record/borrow-history/${id}`,{
            params: {page, size}
        });
        return response.data;
    },
    getBookReturned: async (page, size, sortField) => {
        const response = await instance.get('/api/borrow-record/executed-request-history', {
            params: { page, size, sortField}
        });
        return response.data;
    },
    getExpiredBook: async () => {
        const response = await instance.get('/api/borrow-record/borrow-records-expired');
        return response.data;
    },
    renewBook: async (id, data) => {
        const response = await instance.put(`/api/borrow-record/borrow-records/${id}/renew`, data);
        return response.data;
    }
}