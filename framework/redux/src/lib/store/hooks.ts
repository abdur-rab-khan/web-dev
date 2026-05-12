import { createSelector } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector } from "react-redux";

// In "TypeScript" we can create factory "hooks", "function" with "type" annotation, Unlike every-time we need to define the type.
// Here get the both "RootState" and "AppDispatch" and specify the type using "withTypes".

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const createAppSelector = createSelector.withTypes<RootState>();
