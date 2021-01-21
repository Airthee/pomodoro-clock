import React, { useCallback, useState } from 'react';

interface SoundManagerProps {
  initialValue: number
  onSoundChanged?: (value: number) => void
  onTest?: () => void
}

const SoundManager = (props: SoundManagerProps) => {
  const {
    initialValue,
    onSoundChanged,
    onTest,
  } = props;
  
  // Volume management
  const [ value, setValue ] = useState<number>(initialValue);
  const handleChange = useCallback((event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (onSoundChanged) {
      onSoundChanged(newValue);
    }
  }, [ onSoundChanged ]);

  // Test
  const handleClickTest = useCallback(() => {
    if (onTest) {
      onTest();
    }
  }, [ onTest ]);
  
  return (
    <>
      <input type="range" min="0" max="100" value={value} onChange={handleChange} />
      <button type="button" onClick={handleClickTest}>Test</button>
    </>
  )
}

export default SoundManager