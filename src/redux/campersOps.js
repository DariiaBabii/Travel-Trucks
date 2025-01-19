import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

const handleRequest = async (url, errorMessage) => {
  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(errorMessage);
    }
    return response.data;
  } catch (error) {
    toast.error(errorMessage);
    throw error;
  }
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (_, thunkAPI) => {
    try {
      const data = await handleRequest(
        "/campers",
        "Too many requests. Please try again later."
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, thunkAPI) => {
    try {
      const data = await handleRequest(
        `/campers/${id}`,
        "Failed to fetch camper details."
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
