import Axios from "../config/config";

export const SIGN_IN_API = async (body) => {
    try {
        const response = await Axios.post('/api/auth/register', body);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const LOGIN_API = async (body) => {
    try {
        const response = await Axios.post('/api/auth/login', body);
        return response;
    } catch (error) {
        console.error(error);
    }
};


// Role APi 

export const ADD_ROLE = async (body) => {
    try {
        const response = await Axios.post('/api/add-role', body);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const ROLE_LIST = async () => {
    try {
        const token = localStorage.getItem('authToken');
        console.log('Token:', token);

        const response = await Axios.get('/api/role-list', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        console.error('Error fetching role list:', error);
    }
};

export const ROLE_UPDATE = async (body) => {
    try {
        const response = await Axios.post('/api/edit-role', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const ROLE_DELETE = async (body) => {
    try {
        const response = await Axios.post('/api/delete-role', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};


// user Apis 

export const ADD_USER = async (body) => {
    try {
        const response = await Axios.post('/api/add-user', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const UPDATE_USER = async (body) => {
    try {
        const response = await Axios.post('/api/edit-user', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const USER_LIST = async (body) => {
    try {
        const response = await Axios.get('/api/user-list', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const USER_DELETE = async (body) => {
    try {
        const response = await Axios.post('/api/delete-user', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};


// inventry Apis



export const PRODUCT_LIST = async (body) => {
    try {
        const response = await Axios.get('/api/product-list', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};


export const ADD_INVENTRY = async (body) => {
    try {
        const response = await Axios.post('/api/add-inventry', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const INVENTRY_LIST = async (body) => {
    try {
        const response = await Axios.get('/api/inventry-list', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const INVENTRY_DELETE = async (body) => {
    try {
        const response = await Axios.post('/api/delete-inventry', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const INVENTRY_UPDATE = async (body) => {
    try {
        const response = await Axios.post('/api/edit-inventry', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};


// Expense  Apis


export const ADD_EXPENSE = async (body) => {
    try {
        const response = await Axios.post('/api/add-expense', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const EXPENSE_LIST = async (body) => {
    try {
        const response = await Axios.get('/api/expense-list', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const EXPENSE_DELETE = async (body) => {
    try {
        const response = await Axios.post('/api/delete-expense', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const EXPENSE_UPDATE = async (body) => {
    try {
        const response = await Axios.post('/api/edit-expense', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

// Invoice Apis

export const ADD_INVOICE = async (body) => {
    try {
        const response = await Axios.post('/api/add-invoice', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const INVOICE_LIST = async (body) => {
    try {
        const response = await Axios.get('/api/invoice-list', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const INVOICE_DELETE = async (body) => {
    try {
        const response = await Axios.post('/api/delete-invoice', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};

export const INVOICE_UPDATE = async (body) => {
    try {
        const response = await Axios.post('/api/edit-invoice', body)
        return response;
    } catch (error) {
        console.error(error);

    }
};





