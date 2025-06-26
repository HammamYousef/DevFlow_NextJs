import { JobFilterParams } from "@/types/action";
import { getCountriesByRegion } from "@yusifaliyevpro/countries";

export const fetchLocation = async () => {
  try {
    const response = await fetch(
      "http://ip-api.com/json/?fields=status,message,continent"
    );
    const location = await response.json();

    if (location.status === "success") {
      return {
        continent: location.continent,
      };
    } else {
      console.log(location.message);
      return { continent: null };
    }
  } catch (error) {
    console.log(error);
    return { continent: null };
  }
};

export const fetchCountries = async () => {
  try {
    const location = await fetchLocation();

    if (!location.continent) {
      console.log("Continent not found.");
      return [];
    }

    // Fetch countries based on the continent
    const countries = await getCountriesByRegion({
      region: location.continent, // Use the continent dynamically
      fields: ["name"], // Retrieve only the name field
    });

    // Map the fetched countries to the desired structure
    return (
      countries?.map((country) => ({
        name: { common: country.name.common },
      })) ?? []
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const fetchJobs = async (filters: JobFilterParams) => {
  const { query, page } = filters;

  const headers = {
    "X-RapidAPI-Key": process.env.RAPID_API_KEY ?? "",
    "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
  };

  const response = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=1&country=us&date_posted=all&fields=job_id%2Cemployer_name%2Cemployer_logo%2Cemployer_website%2Cjob_employment_type%2Cjob_title%2Cjob_description%2Cjob_apply_link%2Cjob_city%2Cjob_state%2Cjob_country`,
    {
      headers,
    }
  );

  const result = await response.json();

  return result.data;
};
