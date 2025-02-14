function numberInputMask(event: React.ChangeEvent<HTMLInputElement>): string {
  const { value } = event.target;
  let sanitizedValue = value.replace(/[^0-9,]/g, '');

  const commaIndex = sanitizedValue.indexOf(',');
  if (commaIndex !== -1) {
    sanitizedValue = sanitizedValue.slice(0, commaIndex + 1) + sanitizedValue.slice(commaIndex + 1).replace(/,/g, '');
  }

  return sanitizedValue;
}

export default numberInputMask;