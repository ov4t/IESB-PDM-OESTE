import { Platform } from 'react-native';

export const themes = {
  light: {
    background: '#F4F6FA',
    card: '#FFFFFF',
    text: '#1B1F2A',
    textSecondary: '#5E6678',
    border: '#D9DEE8',
    primary: '#3F51B5',
    onPrimary: '#FFFFFF',
    danger: '#D32F2F',
    inputBackground: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.4)',
  },
  dark: {
    background: '#10131A',
    card: '#1B2030',
    text: '#F1F3F8',
    textSecondary: '#A3ABBD',
    border: '#2E3548',
    primary: '#8C9EFF',
    onPrimary: '#10131A',
    danger: '#FF6B6B',
    inputBackground: '#232A3D',
    overlay: 'rgba(0, 0, 0, 0.6)',
  },
};

// Recebe o valor de useColorScheme() ('light' | 'dark' | null).
export function getTheme(colorScheme) {
  return colorScheme === 'dark' ? themes.dark : themes.light;
}

// Sombra dos cards adaptada por plataforma.
export const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
  },
  android: {
    elevation: 3,
  },
  default: {},
});
