import React from "react";
import { ConfigProvider } from "antd";

function AntDesignTheme({ children }: { children: React.ReactNode }) {
  const primaryColor = '#42264C'
  return (
    <ConfigProvider
      theme={{
        token: {
            colorPrimary: primaryColor,
            controlOutline : 'none',
            borderRadius : 2
        },
        components: {
            Button : {
                controlHeight : 45,
                colorBorder : primaryColor,
            },
            Input : {
                controlHeight : 45
            },
            Select : {
                controlHeight : 45
            },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntDesignTheme;
