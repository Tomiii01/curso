"use client";

import { SliderProps } from "@radix-ui/react-slider";
import * as React from "react";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export interface props extends SliderProps {
  label: string;
}

export function ConfigSelector(props: props) {
  const [value, setValue] = React.useState(props.defaultValue);

  return (
    <div className="grid gap-2 pt-2">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="temperature">{props.label}</Label>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
            {value}
          </span>
        </div>
        <Slider
          {...props}
          id={props.label}
          defaultValue={value}
          onValueChange={(value) => {
            setValue(value);
            props.onValueChange?.(value);
          }}
          className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
          aria-label={props.label}
        />
      </div>
    </div>
  );
}
