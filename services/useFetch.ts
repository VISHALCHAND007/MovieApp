import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const data = await fetchFunction();
            setData(data);
        } catch (err) {
            console.log(err);
            setError(
                err instanceof Error ? err : new Error("An unknown error occurred")
            );
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, error, loading, reFetch: fetchData, reset };
};

export default useFetch;