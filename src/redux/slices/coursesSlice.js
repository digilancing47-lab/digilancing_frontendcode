import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE } from "../../apiBase";

// Fetch default courses (for non-logged-in users)
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async ({ page = 1, limit = 8 }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/v_1/courses?page=${page}&limit=${limit}`, {
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
      const data = await res.json();
      return {
        data: Array.isArray(data.data) ? data.data : [],
        page,
      };
    } catch (err) {
      console.error("Error fetching default courses:", err);
      return rejectWithValue(err.message);
    }
  }
);

// Fetch user-specific courses (after login)
export const fetchUserCourses = createAsyncThunk(
  "courses/fetchUserCourses",
  async ({ guide_code, page = 1, limit = 8 }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/v_1/courses/couseslist/${guide_code}?page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error(`Failed to fetch user courses: ${res.status}`);
      const data = await res.json();
      return {
        data: Array.isArray(data.courses) ? data.courses : [],
        page,
      };
    } catch (err) {
      console.error("Error fetching user courses:", err);
      return rejectWithValue(err.message);
    }
  }
);

export const fetchCourseDetail = createAsyncThunk(
  "courses/fetchCourseDetail",
  async (course_code, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_BASE}/api/v_1/courses/courses_detailedlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ course_code }),
      });

      if (!res.ok) throw new Error(`Failed to fetch course detail: ${res.status}`);

      const data = await res.json();
      console.log("Course detail API response:", data);

      if (data && data.course) {
        return data; 
      } else {
        return rejectWithValue("Course detail not found");
      }
    } catch (err) {
      console.error("Error in fetchCourseDetail:", err);
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);


const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
    detailedCourse: null,
    loadingDetail: false,
  },
  reducers: {
    resetCourses: (state) => {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
    },
    clearDetailedCourse: (state) => {
      state.detailedCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Default courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedCourses = action.payload.data || [];
        if (fetchedCourses.length === 0) {
          state.hasMore = false;
        } else {
          if (action.payload.page === 1) {
            state.items = fetchedCourses;
          } else {
            state.items = [...state.items, ...fetchedCourses];
          }
          state.page = action.payload.page;
          state.hasMore = fetchedCourses.length === 8;
        }
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // User-specific courses
      .addCase(fetchUserCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCourses.fulfilled, (state, action) => {
        state.loading = false;
        const fetchedCourses = action.payload.data || [];
        if (fetchedCourses.length === 0) {
          state.hasMore = false;
        } else {
          if (action.payload.page === 1) {
            state.items = fetchedCourses;
          } else {
            state.items = [...state.items, ...fetchedCourses];
          }
          state.page = action.payload.page;
          state.hasMore = fetchedCourses.length === 8;
        }
      })
      .addCase(fetchUserCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Course details
      .addCase(fetchCourseDetail.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(fetchCourseDetail.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.detailedCourse = action.payload;
      })
      .addCase(fetchCourseDetail.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action.payload;
      });
  },
});

export const { resetCourses, clearDetailedCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
