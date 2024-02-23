import axios from "axios";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./index.css";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { Card, ListGroup } from "react-bootstrap";
import ImageUploader from "../components/uploadImage";
import ConvertDate from "../components/dateFormat";


const ImageCarousel = () => {
  const [image, setImage] = useState([]);
  const [selectedImageMetadata, setSelectedImageMetadata] = useState([]);


  // api call

  const getImage = async () => {
    try {
      const imageData = await axios.get(
        `https://squid-app-doa5g.ondigitalocean.app/api/images`
      );
      setImage(imageData?.data?.data);
      console.log(imageData.data.data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getImage();
    handleThumbnailClick()
  }, []);

  
  
   

  // thumbnail details getting function

  const handleImageClick = async (index) => {
    const selectedMetadata = await image?.[index]?.metadata;
    console.log("Selected Metadata:", selectedMetadata);
    setSelectedImageMetadata(selectedMetadata || null);
  };


  console.log(selectedImageMetadata)
  console.log(image)


 const handleThumbnailClick = (index) => {
   // Trigger handleImageClick when a thumbnail is clicked
   handleImageClick(index || 0);
  };
  
 
  // Format the images array to match the expected format for react-image-gallery
  const formattedImages = image.map((image, index) => ({
    original: `https://squid-app-doa5g.ondigitalocean.app/${image?.filename}`,
    thumbnail: `https://squid-app-doa5g.ondigitalocean.app/${image?.filename}`,
    onClick: () => handleImageClick(index), // Attach onClick handler to each image
    // You can adjust the thumbnail  as needed
  }));


  // accordian
  
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        className="border"
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  // managing placeholder image for error


  return (
    <div>
      <p className="fs-4 border rounded text-secondary">This is a raw image processing app. It enables users to see thier raw images in jpeg/jpg format and also its metadata.</p>
      {image.length > 0 && (
        <Row className="parent-container">
          <Col sm="9">
            <ImageGallery
              thumbnailTitle="name"
              items={formattedImages}
              onThumbnailClick={(event, index) => handleThumbnailClick(index)}
              // lazyLoad={true}
            />
          </Col>
          <Col sm="3">
            <Accordion defaultActiveKey="0">
              <Card style={{ borderColor: "#242424", color: "#242424" }}>
                <ImageUploader />
                <Card.Header
                  style={{ borderColor: "#242424", color: "#242424" }}
                >
                  <CustomToggle eventKey="0">
                    Click thumbnail for detail
                  </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                  <Card.Body
                    style={{ borderColor: "#242424", color: "#242424" }}
                  >
                    {selectedImageMetadata && (
                      <>
                        <ListGroup>
                          <ListGroup.Item>
                            {" "}
                            <div>Lens: {selectedImageMetadata.lens}</div>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <div>ISO: {selectedImageMetadata.iso}</div>
                          </ListGroup.Item>
                          <ListGroup.Item>
                            {
                              <ConvertDate
                                captureTime={selectedImageMetadata?.captureTime}
                              />
                            }
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Speed: {selectedImageMetadata.speed}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Aperture: {selectedImageMetadata.aperture}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            ImageSize: {selectedImageMetadata.imageSize}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            WhiteBalance: {selectedImageMetadata.whiteBalance}
                          </ListGroup.Item>{" "}
                          <ListGroup.Item>
                            Color: {selectedImageMetadata.colour}
                          </ListGroup.Item>{" "}
                          <ListGroup.Item>
                            Camera: {selectedImageMetadata.camera}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            Rating: {selectedImageMetadata.rating}
                          </ListGroup.Item>{" "}
                          <ListGroup.Item>
                            LensAF: {selectedImageMetadata.lenAF}
                          </ListGroup.Item>
                        </ListGroup>
                      </>
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImageCarousel;
