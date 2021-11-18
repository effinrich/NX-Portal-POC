export const getInitials = userName => {
  if (userName) {
    return userName
      .split(' ')
      .map(part => (part[0] ? part[0].toUpperCase() : ''))
      .join('')
  }
}
