import axios from "axios";

const axiosPublic = axios.create({
    baseURL: `https://studysphere-server.vercel.app` // Change this to your public API base URL
});

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;