export const COLORS = {
  primary: '#FF6B6B',  // Coral red
  secondary: '#4ECDC4', // Turquoise
  accent1: '#FFE66D',  // Sunny yellow
  accent2: '#6C5CE7',  // Purple
  accent3: '#A8E6CF',  // Mint green
  background: '#F8F9FA',
  white: '#FFFFFF',
  text: '#2D3436',
  textLight: '#636E72',
  gradients: {
    food1: ['#FF6B6B', '#FFA06B'],
    food2: ['#4ECDC4', '#45B7AF'],
    food3: ['#A8E6CF', '#6C5CE7'],
  }
};

export const FONTS = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  body: {
    fontSize: 16,
    color: COLORS.text,
  },
  caption: {
    fontSize: 14,
    color: COLORS.textLight,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 4,
  },
}; 