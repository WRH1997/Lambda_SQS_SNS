package org.example;

//configuring imports
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import java.io.File;


public class Main {

    private static final String reg = "us-east-1";

    public static void main(String[] args) {

        //creating a BasicAWSCredentials object to store our AWS keys
        /*CITATION NOTE:
        The following code to establish an S3 client session:
        was adapted by referencing the following source:
        URL: https://medium.com/geekculture/upload-or-replace-file-s-onto-amazon-s3-bucket-with-a-few-lines-of-java-code-a19d52c81d54
         */
        BasicAWSCredentials credentials = new BasicAWSCredentials("AKIAR2VYCU2GZTQ6W5FB",
                "J/Sg4GUCbQ9V165O6cbuaI17dWyL/tP9FZBFusHi");

        //establishing an S3 connection using the supplied credentials and region
        AmazonS3 s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.fromName(reg))
                .build();



        //instantiate file object pointing to index.html
        String filePath = "/Users/waleedalhindi/Desktop/Summer 2023/Serverless Data Processing/GitLab/csci-5410/A1/src/main/resources/index.html";
        File file = new File(filePath);



        //pushing the index.html contents (saved in file var) to "csci5410-a1-wrh1997" S3 bucket with the key "index.html"
        /*CITATION NOTE:
        The following code to push an object to an S3 bucket was adapted
        by referencing the following source:
        URL: https://www.baeldung.com/aws-s3-java
         */
        s3Client.putObject("csci5410-a1-wrh1997", "index.html", file);

    }
}