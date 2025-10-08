// src/redux/slices/registerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE } from "../../apiBase";

export const verifyReferral = createAsyncThunk(
  "register/verifyReferral",
  async (referral, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE}/api/v_1/users/verifyreferral/${referral}`
      );
      const data = await response.json();
      if (
        data &&
        data.message &&
        String(data.message).toLowerCase().includes("invalid referral")
      ) {
        return rejectWithValue({
          status: 400,
          message: data.message || "Invalid referral code",
        });
      }

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          message: data.message || "Failed to verify referral",
        });
      }

      // Success - payload shape expected: { message: "...", data: [...] }
      return data;
    } catch (err) {
      return rejectWithValue({
        status: 500,
        message: err?.message || "Network error verifying referral",
      });
    }
  }
);

export const registerAndPay = createAsyncThunk(
  "register/registerAndPay",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE}/api/v_1/users/register-and-pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          message: data.message || "Registration failed",
        });
      }

      return data;
    } catch (err) {
      return rejectWithValue({
        status: 500,
        message: err.message || "Network error",
      });
    }
  }
);

const initialState = {
  step: 1,
  referral: "",
  referralVerified: false,
  selectedCard: null,
  packages: [],
  defaultPackages: [],
  formData: {
    full_name: "",
    state: "",
    phone: "",
    email: "",
    confirmEmail: "",
    password: "",
  },
  paymentData: null,
  loading: false,
  error: null,
  hasPurchased: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setReferral: (state, action) => {
      state.referral = action.payload;
      state.referralVerified = false;
      // reset packages back to default MRP (already stored as numbers)
      state.packages = state.defaultPackages;
    },
    setSelectedCard: (state, action) => {
      state.selectedCard = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setDefaultPackages: (state, action) => {
      // Ensure default packages store numeric prices (not formatted strings).
      const converted = action.payload.map((pkg) => ({
        ...pkg,
        // coerce the incoming price to number if possible
        price: Number(pkg.price) || 0,
      }));
      state.defaultPackages = converted;
      state.packages = converted;
    },
    updateHasPurchased: (state, action) => {
      state.hasPurchased = action.payload;
    },
    resetRegister: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyReferral.fulfilled, (state, action) => {
        state.loading = false;

        // action.payload.data expected to be an array of { package_id, referral_amount, ... }
        const referralData = action.payload?.data || [];

        const updatedPackages = state.defaultPackages.map((pkg) => {
          const matched = referralData.find((p) => p.package_id === pkg.id);
          if (matched) {
            const amountNumber = Number(matched.referral_amount);
            // If matched.referral_amount is valid number, use it → otherwise keep default pkg price
            if (!isNaN(amountNumber) && amountNumber > 0) {
              return { ...pkg, price: amountNumber };
            }
          }
          return pkg;
        });

        state.packages = updatedPackages;
        state.referralVerified = true;
        state.error = null;
      })
      .addCase(verifyReferral.rejected, (state, action) => {
        state.loading = false;
        // action.payload is { status, message } from rejectWithValue
        state.error = action.payload || { status: 500, message: "Referral check failed" };
        state.referralVerified = false;
        // ensure we keep MRP/default prices
        state.packages = state.defaultPackages;
      })
      .addCase(registerAndPay.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAndPay.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentData = action.payload;
        state.step = 3;
      })
      .addCase(registerAndPay.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setStep,
  setReferral,
  setSelectedCard,
  setFormData,
  setDefaultPackages,
  updateHasPurchased,
  resetRegister,
} = registerSlice.actions;

export default registerSlice.reducer;
