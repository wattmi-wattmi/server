const env_config = {
    port : Number(process.env.PORT) || 8000,
    jwt_secret : process.env.JWT_SECRET!,
    front_end_origin : process.env.FRONT_END_ORIGIN!
} as const;
export default env_config;