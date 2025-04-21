const env_config = {
    port : Number(process.env.PORT) || 8000
} as const;
export default env_config;