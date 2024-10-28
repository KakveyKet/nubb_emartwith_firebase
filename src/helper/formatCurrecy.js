export const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);
};

export const KhmerCurrency = (value) => {
    return new Intl.NumberFormat("km-KH", {
        style: "currency",
        currency: "KHR", // Correct ISO 4217 currency code for Cambodian Riel
    }).format(value);
};

// Format number
export const formatNumber = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
};

export const formatDate = (value) => {
    return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const formatDateTime = (value) => {
    return new Date(value).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export const formatNumberWithCommas = (value) => {
    return new Intl.NumberFormat("en-US").format(value);
};