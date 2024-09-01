import { useSharedValue, withSpring } from "react-native-reanimated";
import colors from "@/source/theme/colors";

export const SPRING_CONFIG = { duration: 1350, dampingRatio: 0.7 };
export const OPACITY_SPRING_CONFIG = { duration: 750, dampingRatio: 0.7 };
export const INITIAL_BUTTON_OFFSET = -20;
export const BUTTON_SPACING = 10;
export const X_BUTTON_INITIAL_LEFT = -50;
export const X_BUTTON_FINAL_LEFT = 0;
export const X_BUTTON_INITIAL_OPACITY = 0;
export const X_BUTTON_FINAL_OPACITY = 1;

export function useAnimatedValues() {
  return {
    seriesButtonLeft: useSharedValue(0),
    seriesButtonOpacity: useSharedValue(1),
    seriesButtonBackground: useSharedValue("transparent"),
    seriesButtonTextColor: useSharedValue(colors.whiteGrey),

    moviesButtonLeft: useSharedValue(0),
    moviesButtonOpacity: useSharedValue(1),
    moviesButtonBackground: useSharedValue("transparent"),
    moviesButtonTextColor: useSharedValue(colors.whiteGrey),

    xButtonLeft: useSharedValue(X_BUTTON_INITIAL_LEFT),
    xButtonOpacity: useSharedValue(X_BUTTON_INITIAL_OPACITY),

    categoryButtonLeft: useSharedValue(0),
    categoryButtonOpacity: useSharedValue(1),
    categoryButtonBackground: useSharedValue("transparent"),

    categoriesButtonLeft: useSharedValue(0),
    categoriesButtonOpacity: useSharedValue(1),

    allCategoriesButtonLeft: useSharedValue(0),
    allCategoriesButtonOpacity: useSharedValue(0),
  };
}

export function animateContentTypeSelection(
  contentType: "movie" | "series" | "mixed",
  currentContentType: "movie" | "series" | "mixed",
  xButtonWidth: number,
  seriesButtonWidth: number,
  moviesButtonWidth: number,
  values: ReturnType<typeof useAnimatedValues>,
  onChangeContentType: (contentType: "movie" | "series" | "mixed") => void,
  setCurrentContentType: (contentType: "movie" | "series" | "mixed") => void
) {
  const {
    xButtonLeft,
    xButtonOpacity,
    seriesButtonLeft,
    seriesButtonOpacity,
    seriesButtonBackground,
    seriesButtonTextColor,
    moviesButtonLeft,
    moviesButtonOpacity,
    moviesButtonBackground,
    moviesButtonTextColor,
    categoriesButtonLeft,
    categoriesButtonOpacity,
    categoryButtonLeft,
    categoryButtonOpacity,
    categoryButtonBackground,
    allCategoriesButtonLeft,
    allCategoriesButtonOpacity,
  } = values;

  const isMovie = contentType === "movie";
  const isSeries = contentType === "series";

  if (currentContentType !== contentType && (isMovie || isSeries)) {
    onChangeContentType(contentType);
    setCurrentContentType(contentType);
    xButtonLeft.value = withSpring(X_BUTTON_FINAL_LEFT, SPRING_CONFIG);
    xButtonOpacity.value = withSpring(
      X_BUTTON_FINAL_OPACITY,
      OPACITY_SPRING_CONFIG
    );

    seriesButtonLeft.value = withSpring(
      isSeries ? xButtonWidth + BUTTON_SPACING : INITIAL_BUTTON_OFFSET,
      SPRING_CONFIG
    );
    seriesButtonOpacity.value = withSpring(
      isSeries ? 1 : 0,
      OPACITY_SPRING_CONFIG
    );
    seriesButtonBackground.value = withSpring(
      isSeries ? colors.whiteGrey : "transparent"
    );
    seriesButtonTextColor.value = withSpring(
      isSeries ? colors.white : colors.whiteGrey
    );

    moviesButtonLeft.value = withSpring(
      isMovie ? xButtonWidth + BUTTON_SPACING : INITIAL_BUTTON_OFFSET,
      SPRING_CONFIG
    );
    moviesButtonOpacity.value = withSpring(
      isMovie ? 1 : 0,
      OPACITY_SPRING_CONFIG
    );
    moviesButtonBackground.value = withSpring(
      isMovie ? colors.whiteGrey : "transparent"
    );
    moviesButtonTextColor.value = withSpring(
      isMovie ? colors.white : colors.whiteGrey
    );

    categoriesButtonLeft.value = withSpring(
      INITIAL_BUTTON_OFFSET,
      SPRING_CONFIG
    );
    categoriesButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);
    allCategoriesButtonLeft.value = withSpring(
      xButtonWidth + moviesButtonWidth + BUTTON_SPACING + 5,
      SPRING_CONFIG
    );
    allCategoriesButtonOpacity.value = withSpring(1, OPACITY_SPRING_CONFIG);

    return;
  }

  onChangeContentType("mixed");
  setCurrentContentType("mixed");
  xButtonLeft.value = withSpring(X_BUTTON_INITIAL_LEFT, SPRING_CONFIG);
  xButtonOpacity.value = withSpring(
    X_BUTTON_INITIAL_OPACITY,
    OPACITY_SPRING_CONFIG
  );

  seriesButtonLeft.value = withSpring(0, SPRING_CONFIG);
  seriesButtonOpacity.value = withSpring(1, OPACITY_SPRING_CONFIG);
  seriesButtonBackground.value = withSpring("transparent");
  seriesButtonTextColor.value = withSpring(colors.whiteGrey);

  moviesButtonLeft.value = withSpring(
    seriesButtonWidth + BUTTON_SPACING / 2,
    SPRING_CONFIG
  );
  moviesButtonOpacity.value = withSpring(1, OPACITY_SPRING_CONFIG);
  moviesButtonBackground.value = withSpring("transparent");
  moviesButtonTextColor.value = withSpring(colors.whiteGrey);

  categoriesButtonLeft.value = withSpring(
    seriesButtonWidth + moviesButtonWidth + BUTTON_SPACING,
    SPRING_CONFIG
  );
  categoriesButtonOpacity.value = withSpring(1, OPACITY_SPRING_CONFIG);

  allCategoriesButtonLeft.value = withSpring(
    INITIAL_BUTTON_OFFSET,
    SPRING_CONFIG
  );
  allCategoriesButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);

  categoryButtonLeft.value = withSpring(INITIAL_BUTTON_OFFSET, SPRING_CONFIG);
  categoryButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);
  categoryButtonBackground.value = withSpring("transparent");
}

export function animateCategorySelection(
  categoryId: string,
  xButtonWidth: number,
  values: ReturnType<typeof useAnimatedValues>,
  onChangeCategory: (categoryId: string) => void,
  setSelectedCategoryId: (categoryId: string) => void
) {
  const {
    xButtonLeft,
    xButtonOpacity,
    seriesButtonLeft,
    seriesButtonOpacity,
    seriesButtonBackground,
    seriesButtonTextColor,
    moviesButtonLeft,
    moviesButtonOpacity,
    moviesButtonBackground,
    moviesButtonTextColor,
    categoriesButtonLeft,
    categoriesButtonOpacity,
    allCategoriesButtonLeft,
    allCategoriesButtonOpacity,
    categoryButtonLeft,
    categoryButtonOpacity,
    categoryButtonBackground,
  } = values;

  onChangeCategory(categoryId);
  setSelectedCategoryId(categoryId);

  xButtonLeft.value = withSpring(X_BUTTON_FINAL_LEFT, SPRING_CONFIG);
  xButtonOpacity.value = withSpring(
    X_BUTTON_FINAL_OPACITY,
    OPACITY_SPRING_CONFIG
  );
  seriesButtonLeft.value = withSpring(INITIAL_BUTTON_OFFSET, SPRING_CONFIG);
  seriesButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);
  seriesButtonBackground.value = withSpring("transparent");
  seriesButtonTextColor.value = withSpring(colors.whiteGrey);

  moviesButtonLeft.value = withSpring(INITIAL_BUTTON_OFFSET, SPRING_CONFIG);
  moviesButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);
  moviesButtonBackground.value = withSpring("transparent");
  moviesButtonTextColor.value = withSpring(colors.whiteGrey);

  categoriesButtonLeft.value = withSpring(INITIAL_BUTTON_OFFSET, SPRING_CONFIG);
  categoriesButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);

  allCategoriesButtonLeft.value = withSpring(
    INITIAL_BUTTON_OFFSET,
    SPRING_CONFIG
  );
  allCategoriesButtonOpacity.value = withSpring(0, OPACITY_SPRING_CONFIG);

  categoryButtonLeft.value = withSpring(
    xButtonWidth + BUTTON_SPACING,
    SPRING_CONFIG
  );
  categoryButtonOpacity.value = withSpring(1, OPACITY_SPRING_CONFIG);
  categoryButtonBackground.value = withSpring(colors.whiteGrey);
}
