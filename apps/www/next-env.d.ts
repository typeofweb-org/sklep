/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="next-images" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_URL: string;
  }
}
