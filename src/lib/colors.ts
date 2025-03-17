export function getSectionsColors(sectionName: string) {
  const colors: Record<string, string> = {
    Introduction: '#9c27b0',
    'Key Feature': '#2196f3',
    Highlight: '#f44336',
    Demonstration: '#00bcd4',
    Captivating: '#009688',
    Educational: '#ff9800',
    Conclusion: '#795548',
  };

  if (colors[sectionName] !== undefined) {
    return colors[sectionName];
  }

  return '#000';
}
