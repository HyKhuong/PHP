<?php
class ToursModel
{
    private $conn;
    private $table = 'tours';

    public $id;
    public $title;
    public $description;
    public $price;
    public $duration;
    public $location_id;
    public $category_id;
    public $available ;
    public $start_date ;
    public $end_date ;
    public $status;
    public $create_at;
    public $image_url;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Get all tours
    public function getAll()
    {
        $query = "SELECT * FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    // Get single tour
    public function getById()
    {
        if (!isset($this->id) || !is_numeric($this->id)) {
            throw new Exception("Invalid tour ID");
        }
        $query = "SELECT * FROM " . $this->table . " WHERE tour_id = ? LIMIT 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();
        return $stmt;
    }

    /*get tour by location id*/
    public function getByLocationId($locationId)
    {
        try {
            if (!is_numeric($locationId)) {
                throw new Exception("Invalid location ID");
            }

            $query = "SELECT * FROM " . $this->table . " WHERE location_id = :location_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':location_id', (int)$locationId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC); // Return all results

        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            throw new Exception("Database error while fetching tours");
        }
    }

    /*get tour by location id*/
    public function getByCategoryId($categoryId)
    {
        try {
            if (!is_numeric($categoryId)) {
                throw new Exception("Invalid category ID");
            }

            $query = "SELECT * FROM " . $this->table . " WHERE category_id = :category_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindValue(':category_id', (int)$categoryId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC); // Return all results

        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            throw new Exception("Database error while fetching tours");
        }
    }

    //search for location
    public function getWithFilter($params)
    {
        $baseQuery = "
            SELECT t.*, l.title AS location_title
            FROM tours t
            LEFT JOIN locations l ON t.location_id = l.location_id
        ";
        $conditions = [];
        $values = [];

        if (!empty($params['locationTitle'])) {
            $conditions[] = "l.title LIKE ?";
            $values[] = '%' . $params['locationTitle'] . '%';
        }

        if (!empty($params['startDate'])) {
            $conditions[] = "t.start_date >= ?";
            $values[] = $params['startDate'];
        }

        if (!empty($params['endDate'])) {
            $conditions[] = "t.end_date <= ?";
            $values[] = $params['endDate'];
        }

        if (!empty($params['minPrice'])) {
            $conditions[] = "t.price >= ?";
            $values[] = $params['minPrice'];
        }

        if (!empty($params['maxPrice'])) {
            $conditions[] = "t.price <= ?";
            $values[] = $params['maxPrice'];
        }

        if (!empty($conditions)) {
            $baseQuery .= " WHERE " . implode(" AND ", $conditions);
        }

        $baseQuery .= " ORDER BY t.create_at DESC";

        try {
            $stmt = $this->conn->prepare($baseQuery);
            $stmt->execute($values);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            throw new Exception("Database error: " . $e->getMessage());
        }
    }

    // Create tour
    public function create($data)
    {
        try {
            // Set default values
            $category_id = !empty($data['category_id']) ? $data['category_id'] : 1;
            $image_url = !empty(trim($data['image_url'])) ? $data['image_url'] : "http://localhost:3000/uploads/default.png";
            $description = !empty($data['description']) ? $data['description'] : '';
            $available = isset($data['available']) ? $data['available'] : 0;
            $created_at = !empty($data['create_at']) ? $data['create_at'] : date('Y-m-d H:i:s');

            $query = "
            INSERT INTO tours 
            (title, description, price, location_id, category_id, available, start_date, end_date, status, create_at, image_url) 
            VALUES 
            (:title, :description, :price, :location_id, :category_id, :available, :start_date, :end_date, :status, :create_at, :image_url)
        ";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':description', $description);
            $stmt->bindParam(':price', $data['price']);
            $stmt->bindParam(':location_id', $data['location_id']);
            $stmt->bindParam(':category_id', $category_id);
            $stmt->bindParam(':available', $available);
            $stmt->bindParam(':start_date', $data['start_date']);
            $stmt->bindParam(':end_date', $data['end_date']);
            $stmt->bindParam(':status', $data['status']);
            $stmt->bindParam(':create_at', $created_at);
            $stmt->bindParam(':image_url', $image_url);

            if (!$stmt->execute()) {
                throw new Exception("Insert failed");
            }

            $insertedId = $this->conn->lastInsertId();

            // Fetch newly created tour with location name
            $query = "
            SELECT t.*, l.title AS location 
            FROM tours t 
            LEFT JOIN locations l ON t.location_id = l.location_id 
            WHERE t.tour_id = :id
        ";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':id', $insertedId);
            $stmt->execute();
            $tour = $stmt->fetch(PDO::FETCH_ASSOC);

            return $tour;
        } catch (Exception $e) {
            error_log("Database error: " . $e->getMessage());
            throw new Exception("Failed to add new tour: " . $e->getMessage());
        }
    }


    // Update tour
    public function update($number_people)
    {
        $query = "UPDATE " . $this->table . " 
                  SET 
                    available = available - :number_people,
                    status = CASE 
                                WHEN available - :number_people = 0 THEN 'Completed' 
                                ELSE status 
                             END
                  WHERE 
                    tour_id = :tour_id AND 
                    available >= :number_people";

        $stmt = $this->conn->prepare($query);

        // Sanitize and bind values
        $this->id = htmlspecialchars(strip_tags($this->id));
        $number_people = htmlspecialchars(strip_tags($number_people));

        $stmt->bindParam(':number_people', $number_people, PDO::PARAM_INT);
        $stmt->bindParam(':tour_id', $this->id, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Update a tour (generic function)
    public function updateTourModel($id, $updateData)
    {
        try {
            // Prepare the SET clause and values for the SQL query
            $setClause = '';
            $values = [];
            foreach ($updateData as $key => $value) {
                if ($key === 'location_id') {
                    $setClause .= "location_id = ?, ";
                } else {
                    $setClause .= "$key = ?, ";
                }
                $values[] = $value;
            }

            // Remove the trailing comma and space
            $setClause = rtrim($setClause, ', ');

            // Add the id to the values array for the WHERE clause
            $values[] = $id;

            // Prepare the UPDATE query
            $query = "UPDATE tours SET $setClause WHERE tour_id = ?";

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            // Dynamically bind the parameters
            $types = str_repeat('s', count($values) - 1) . 'i'; // Assuming most fields are strings, and id is an integer
            $stmt->bind_param($types, ...$values);

            // Execute the query
            $stmt->execute();

            // Check if any rows were affected
            if ($stmt->affected_rows === 0) {
                return null;
            }

            // Fetch the updated tour data
            $selectQuery = "SELECT t.*, l.title AS location 
                            FROM tours t 
                            LEFT JOIN locations l ON t.location_id = l.location_id 
                            WHERE t.tour_id = ?";

            $selectStmt = $this->conn->prepare($selectQuery);
            $selectStmt->bind_param('i', $id);
            $selectStmt->execute();
            $result = $selectStmt->get_result();

            return $result->fetch_assoc();
        } catch (Exception $e) {
            error_log("Error updating tour: " . $e->getMessage());
            throw new Exception("Database error when updating tour");
        }
    }

    // Delete tour
    public function delete()
    {
        $query = "DELETE FROM " . $this->table . " WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
