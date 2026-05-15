import { createSelector } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

// In "TypeScript", We have to create factory "hooks", "function" for getting "TYPE_SUGGESTION"
// It's very important to have otherwise we need to manually specify during using these "hooks", "functions".

// Here get the both "RootState" and "AppDispatch" and specify the type using "withTypes".

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppSelector = createSelector.withTypes<RootState>();
