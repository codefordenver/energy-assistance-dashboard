from fastapi.middleware.cors import CORSMiddleware


def set_cors(app):
    # Docs: https://fastapi.tiangolo.com/tutorial/cors/
    origins = ["*"]  # This is a wildcard. Change to actual urls to limit

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,  # aka cookies. defaults to False
        # allow_methods=["*"],  # defaults to ['GET'] -- * is for all, etc.
        # allow_headers=["*"],  # -- defaults to [] -
        #   The Accept, Accept-Language, Content-Language and Content-Type headers
        #   are always allowed for CORS requests.
    )
