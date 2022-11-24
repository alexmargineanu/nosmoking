import React, { useState, useEffect } from 'react';
import { 
  Flex, Popover, PopoverTrigger,PopoverContent, PopoverClose, IconButton, Input, Text, Fieldset, Label
} from './radixElements/RadixPopover';
import { 
  Box, Select, SelectTrigger, SelectValue, SelectIcon, SelectContent, SelectScrollDownButton, SelectScrollUpButton,
  SelectViewport, SelectGroup, SelectItem, SelectItemText, SelectItemIndicator
} from './radixElements/RadixSelect';
import { MixerHorizontalIcon, Cross2Icon, CheckIcon, ChevronDownIcon, ChevronUpIcon  } from '@radix-ui/react-icons';
import currencies from './data/currencies';

const CurrenciesSelect = () => {
  
  const [currency, setCurrency] = useState(() => {
    const savedData = localStorage.getItem("currency");
    return savedData ? JSON.parse(savedData) : "";
  });

  useEffect(() => {
    localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);


  return (
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger aria-label="Currency">
          <SelectValue placeholder="Currency" />
          <SelectIcon>
            <ChevronDownIcon />
          </SelectIcon>
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton>
            <ChevronUpIcon />
          </SelectScrollUpButton>
          <SelectViewport>
            <SelectGroup>
              {currencies.map(currency => {
                return (
                  <SelectItem value={currency.cc} key={currency.cc}>
                    <SelectItemText>{currency.cc}</SelectItemText>
                    <SelectItemIndicator>
                      <CheckIcon />
                    </SelectItemIndicator>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectViewport>
          <SelectScrollDownButton>
            <ChevronDownIcon />
          </SelectScrollDownButton>
        </SelectContent>
      </Select>
  )
};

const Settings = ({open = false}) => {
  const [date, setDate] = useState(() => {
    const savedData = localStorage.getItem("date");
    return savedData ? JSON.parse(savedData) : "";
  });
  const [packs, setPacks] = useState(() => {
    const savedData = localStorage.getItem("packs");
    return savedData ? JSON.parse(savedData) : "";
  });
  const [price, setPrice] = useState(() => {
    const savedData = localStorage.getItem("price");
    return savedData ? JSON.parse(savedData) : "";
  });

  useEffect(() => {
    localStorage.setItem("date", JSON.stringify(date));
    localStorage.setItem("price", JSON.stringify(price));
    localStorage.setItem("packs", JSON.stringify(packs));
  }, [date, price, packs]);

  return (
    <Popover defaultOpen={open}>
      <PopoverTrigger asChild>
        <IconButton aria-label="Update settings" css={{ marginTop: 10 }}>
          <MixerHorizontalIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} >
        <Flex css={{ flexDirection: 'column', gap: 10 }}>
          <Text bold css={{ marginBottom: 10 }}>
            Settings
          </Text>
          <Fieldset>
            <Label htmlFor="date">Date when you've stopped smoking</Label>
            <Input id="date" defaultValue={date} onChange={(e)=>setDate(e.target.value)} placeholder="mm/dd/yyyy" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="packs">How many packs per week</Label>
            <Input id="packs" defaultValue={packs} onChange={(e)=>setPacks(e.target.value)} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="price">Price per pack</Label>
            <Box>
              <Input id="price" css={{width: '48%', marginRight: 10}}  defaultValue={price} onChange={(e)=>setPrice(e.target.value)} />
              <CurrenciesSelect />
            </Box>
          </Fieldset>
        </Flex>
        <PopoverClose aria-label="Close">
          <Cross2Icon />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  )
  };

export default Settings;
