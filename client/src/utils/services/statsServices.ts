import axios from "axios";
import { SERVER_URL } from "./serviceConstants";
import { getToken } from "./userServices";

const STATS_API_URL = `${SERVER_URL}/stats`;

const getWeeklyBreakDownStats = async (): Promise<any> => {
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` }}

    const { data: { data: stats } } = await axios.get(STATS_API_URL, config);

    return stats
}

const statsServices = {
    getWeeklyBreakDownStats
}

export default statsServices;