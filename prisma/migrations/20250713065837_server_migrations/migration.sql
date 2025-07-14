-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "featuredImage" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "users_emailAddress_key" ON "users"("emailAddress");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
