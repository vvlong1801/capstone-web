const EVALUATE_METHOD = [
  {
    label: 'Rep',
    value: 'reps',
    icon: 'pi-bolt'
  },
  {
    label: 'Second',
    value: 'seconds',
    icon: 'pi-clock'
  }
];

const GENDER = [
  { label: 'All', value: 'all', severity: 'success' },
  { label: 'Male', value: 'male', severity: 'success' },
  { label: 'Female', value: 'female', severity: 'success' }
];

const TYPE_LEVEL = [
  { label: 'Easy', value: 'easy', severity: 'success' },
  { label: 'Middle', value: 'middle', severity: 'primary' },
  { label: 'Hard', value: 'hard', severity: 'danger' }
];

const STATUS = {
  active: { label: 'Active', value: 'active' },
  disabled: { label: 'Disabled', value: 'disabled' }
};

function getOption(optionData, value) {
  const result = optionData.filter((option) => option.value === value);
  return result[0];
}

function getLabel(optionData, value) {
  const option = getOption(optionData, value);
  return option.label;
}

function getIcon(optionData, value) {
  if (optionData[0].hasOwnProperty('icon')) {
    const option = getOption(optionData, value);
    return option.icon;
  }
  return null;
}

function getSeverity(optionData, value) {
  if (optionData[0].hasOwnProperty('severity')) {
    const option = getOption(optionData, value);
    return option.severity;
  }
  return null;
}

export { EVALUATE_METHOD, TYPE_LEVEL, STATUS, GENDER, getOption, getIcon, getLabel, getSeverity };
