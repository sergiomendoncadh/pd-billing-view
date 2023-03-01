import { IOpsSdk } from "@deliveryhero/opsportal";

const specialCountryCodesMap: { [k: string]: string } = {
    se: "op",
    fi: "po",
    at: "mj",
    de: "dl",
};

export const getBaseUrl = (
    baseApi: IOpsSdk,
    countryCode = baseApi.getCountry()?.code
): string | null => {
    if (!countryCode || !process.env.GQL_ENDPOINT) {
        return null;
    }

    countryCode = countryCode.toLowerCase();

    return process.env.GQL_ENDPOINT.replace(
        "{country}",
        specialCountryCodesMap[countryCode] || countryCode
    );
};
